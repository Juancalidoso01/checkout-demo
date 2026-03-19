;(function(){
  const LOCAL_KEY = 'pp_onboarding_applications_v1';
  const TABLE = 'applications';
  const REVIEW_TABLE = 'application_reviews';
  const VALID_STATUSES = {
    draft: true,
    submitted: true,
    contract_pending: true,
    pending_review: true,
    needs_changes: true,
    approved: true,
    rejected: true,
    active: true
  };
  let cachedClient = null;

  function safeJsonParse(raw, fallback){
    try { return raw ? JSON.parse(raw) : fallback; }
    catch (err) { return fallback; }
  }

  function readLocalApplications(){
    return safeJsonParse(localStorage.getItem(LOCAL_KEY), []);
  }

  function writeLocalApplications(applications){
    localStorage.setItem(LOCAL_KEY, JSON.stringify(applications || []));
    return applications || [];
  }

  function normalizeStatus(status){
    const value = String(status || 'draft').trim().toLowerCase().replace(/\s+/g, '_');
    if (value === 'pending') return 'pending_review';
    if (value === 'review') return 'pending_review';
    if (VALID_STATUSES[value]) return value;
    return 'draft';
  }

  function toTimestamp(value){
    if (value == null || value === '') return null;
    if (typeof value === 'number') return value;
    const time = new Date(value).getTime();
    return Number.isFinite(time) ? time : null;
  }

  function toIso(value){
    const time = toTimestamp(value);
    return time ? new Date(time).toISOString() : null;
  }

  function getSupabaseClient(){
    if (cachedClient) return cachedClient;
    const cfg = window.PPSupabaseConfig || {};
    const enabled = !!(cfg.enabled && cfg.url && cfg.anonKey && window.supabase && typeof window.supabase.createClient === 'function');
    if (!enabled) return null;
    cachedClient = window.supabase.createClient(cfg.url, cfg.anonKey);
    return cachedClient;
  }

  function isEnabled(){
    return !!getSupabaseClient();
  }

  function cloneApplication(app){
    return app ? JSON.parse(JSON.stringify(app)) : null;
  }

  function getPrimaryEmail(app){
    const data = (app && app.onboarding) || {};
    return data.repEmail || data.opsContactEmail || data.settlementEmail || null;
  }

  function getPrimaryPhone(app){
    const data = (app && app.onboarding) || {};
    return data.repPhone || data.repCellPhone || data.opsContactPhone || data.businessPhone || null;
  }

  function applicationToRow(app){
    const item = cloneApplication(app) || {};
    const onboarding = item.onboarding || {};
    const review = item.review || {};
    const credentials = item.credentials || {};
    return {
      id: item.id,
      status: normalizeStatus(item.status),
      applicant_email: getPrimaryEmail(item),
      applicant_phone: getPrimaryPhone(item),
      business_trade_name: onboarding.businessTradeName || null,
      business_legal_name: onboarding.businessLegalName || null,
      onboarding_payload: onboarding,
      review_payload: review,
      credentials_payload: credentials,
      current_step: Number.isFinite(item.currentStep) ? item.currentStep : 0,
      kyc_verification: item.kycVerification || null,
      submitted_at: toIso(item.submittedAt),
      approved_at: toIso(review.approvedAt),
      rejected_at: review && review.state === 'rejected' ? toIso(item.updatedAt || Date.now()) : null,
      last_reviewed_at: toIso(item.updatedAt),
      auth_user_id: credentials.authUserId || item.authUserId || null,
      credential_status: credentials.invitationStatus || item.credentialStatus || 'not_invited',
      invited_at: toIso(credentials.invitedAt || item.invitedAt),
      source: item.source || 'web',
      created_at: toIso(item.createdAt) || new Date().toISOString(),
      updated_at: toIso(item.updatedAt) || new Date().toISOString()
    };
  }

  function rowToApplication(row){
    if (!row) return null;
    const onboarding = row.onboarding_payload || {};
    const review = row.review_payload || {};
    const credentials = row.credentials_payload || {};
    if (row.auth_user_id && !credentials.authUserId) credentials.authUserId = row.auth_user_id;
    if (row.credential_status && !credentials.invitationStatus) credentials.invitationStatus = row.credential_status;
    if (row.invited_at && !credentials.invitedAt) credentials.invitedAt = toTimestamp(row.invited_at);
    return {
      id: row.id,
      type: 'agent_onboarding',
      status: normalizeStatus(row.status),
      submittedAt: toTimestamp(row.submitted_at),
      updatedAt: toTimestamp(row.updated_at),
      createdAt: toTimestamp(row.created_at),
      onboarding,
      review,
      credentials,
      currentStep: Number.isFinite(row.current_step) ? row.current_step : 0,
      kycVerification: row.kyc_verification || null,
      authUserId: row.auth_user_id || null,
      credentialStatus: row.credential_status || null,
      invitedAt: toTimestamp(row.invited_at)
    };
  }

  function mergeApplications(primary, secondary){
    const byId = new Map();
    (secondary || []).forEach(function(item){
      if (item && item.id) byId.set(item.id, item);
    });
    (primary || []).forEach(function(item){
      if (item && item.id) byId.set(item.id, item);
    });
    return Array.from(byId.values()).sort(function(a, b){
      return (b && (b.updatedAt || b.createdAt) || 0) - (a && (a.updatedAt || a.createdAt) || 0);
    });
  }

  function saveMergedLocalApplications(applications){
    return writeLocalApplications(mergeApplications(applications, readLocalApplications()));
  }

  function findLocalApplication(id){
    if (!id) return null;
    return readLocalApplications().find(function(item){ return item && item.id === id; }) || null;
  }

  async function listApplications(){
    const client = getSupabaseClient();
    const localApps = readLocalApplications();
    if (!client) return localApps;
    try {
      const { data, error } = await client.from(TABLE).select('*').order('updated_at', { ascending: false });
      if (error) throw error;
      const remoteApps = (data || []).map(rowToApplication).filter(Boolean);
      return writeLocalApplications(mergeApplications(remoteApps, localApps));
    } catch (error) {
      console.warn('PPApplications.listApplications fallback local:', error);
      return localApps;
    }
  }

  async function getApplication(id){
    if (!id) return null;
    const client = getSupabaseClient();
    const localApp = findLocalApplication(id);
    if (!client) return localApp;
    try {
      const { data, error } = await client.from(TABLE).select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      if (!data) return localApp;
      const app = rowToApplication(data);
      saveMergedLocalApplications([app]);
      return app;
    } catch (error) {
      console.warn('PPApplications.getApplication fallback local:', error);
      return localApp;
    }
  }

  async function upsertApplication(app){
    if (!app || !app.id) return { ok: false, error: new Error('application id requerido'), app: null };
    const localApp = cloneApplication(app);
    saveMergedLocalApplications([localApp]);
    const client = getSupabaseClient();
    if (!client) return { ok: true, source: 'local', app: localApp };
    try {
      const row = applicationToRow(localApp);
      const { data, error } = await client.from(TABLE).upsert(row).select('*').single();
      if (error) throw error;
      const savedApp = rowToApplication(data);
      saveMergedLocalApplications([savedApp]);
      return { ok: true, source: 'supabase', app: savedApp };
    } catch (error) {
      console.warn('PPApplications.upsertApplication fallback local:', error);
      return { ok: false, source: 'local', error: error, app: localApp };
    }
  }

  async function recordReviewEvent(event){
    const payload = event || {};
    if (!payload.applicationId || !payload.action) return { ok: false, skipped: true };
    const client = getSupabaseClient();
    if (!client) return { ok: true, source: 'local', skipped: true };
    try {
      const { error } = await client.from(REVIEW_TABLE).insert({
        application_id: payload.applicationId,
        action: payload.action,
        actor: payload.actor || null,
        notes: payload.notes || null,
        payload: payload.payload || {}
      });
      if (error) throw error;
      return { ok: true, source: 'supabase' };
    } catch (error) {
      console.warn('PPApplications.recordReviewEvent fallback local:', error);
      return { ok: false, source: 'local', error: error };
    }
  }

  async function approveApplication(options){
    const config = options || {};
    const current = await getApplication(config.applicationId);
    if (!current) throw new Error('No se encontro la solicitud a aprobar.');
    const timestamp = Date.now();
    const next = {
      ...current,
      status: 'approved',
      updatedAt: timestamp,
      review: {
        ...(current.review || {}),
        state: 'approved',
        approvedBy: config.actor || null,
        approvedAt: timestamp,
        rejectionReason: '',
        notes: config.notes || ''
      },
      credentials: {
        ...(current.credentials || {}),
        inviteEmail: config.inviteEmail || getPrimaryEmail(current),
        displayName: config.displayName || ((current.onboarding || {}).businessTradeName || (current.onboarding || {}).businessLegalName || 'Punto Aliado'),
        invitationStatus: 'pending_invitation'
      },
      credentialStatus: 'pending_invitation'
    };
    const result = await upsertApplication(next);
    await recordReviewEvent({
      applicationId: current.id,
      action: 'approved',
      actor: config.actor || null,
      notes: config.notes || '',
      payload: {
        inviteEmail: config.inviteEmail || null,
        displayName: config.displayName || null,
        invitationStatus: 'pending_invitation'
      }
    });
    return result;
  }

  async function rejectApplication(options){
    const config = options || {};
    const current = await getApplication(config.applicationId);
    if (!current) throw new Error('No se encontro la solicitud a rechazar.');
    const timestamp = Date.now();
    const next = {
      ...current,
      status: 'rejected',
      updatedAt: timestamp,
      review: {
        ...(current.review || {}),
        state: 'rejected',
        approvedBy: null,
        approvedAt: null,
        rejectionReason: config.notes || '',
        notes: config.notes || ''
      }
    };
    const result = await upsertApplication(next);
    await recordReviewEvent({
      applicationId: current.id,
      action: 'rejected',
      actor: config.actor || null,
      notes: config.notes || '',
      payload: {}
    });
    return result;
  }

  async function inviteApprovedApplication(options){
    const config = options || {};
    const client = getSupabaseClient();
    const runtimeCfg = window.PPSupabaseConfig || {};
    if (!client || !runtimeCfg.enableCredentialInvites) {
      return { ok: false, skipped: true, reason: 'invite_not_configured' };
    }
    try {
      const { data, error } = await client.functions.invoke('invite-agent-credentials', {
        body: {
          applicationId: config.applicationId,
          inviteEmail: config.inviteEmail,
          displayName: config.displayName,
          redirectTo: runtimeCfg.agentInviteRedirectTo || runtimeCfg.redirectTo || null
        }
      });
      if (error) throw error;
      return { ok: true, source: 'supabase', data: data || null };
    } catch (error) {
      console.warn('PPApplications.inviteApprovedApplication failed:', error);
      return { ok: false, error: error };
    }
  }

  window.PPApplications = {
    LOCAL_KEY,
    readLocalApplications,
    writeLocalApplications,
    findLocalApplication,
    isEnabled,
    getSupabaseClient,
    normalizeStatus,
    listApplications,
    getApplication,
    upsertApplication,
    recordReviewEvent,
    approveApplication,
    rejectApplication,
    inviteApprovedApplication
  };
})();
