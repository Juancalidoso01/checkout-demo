const fs = require('fs');
let html = fs.readFileSync('/Users/juanpabloobregonjacome/Desktop/Checkout boton/agents/cashout.html', 'utf8');

html = html.replace(
  /<div id="no-bank-state" class="text-center py-4">[\s\S]*?<\/div>[\s\S]*?<!-- State: Bank account exists -->[\s\S]*?<div id="has-bank-state" class="hidden">[\s\S]*?<\/div>\s*<\/div>/,
  `<!-- State: No bank account linked -->
        <div id="no-bank-state" class="text-center py-4">
          <div class="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
            <i class="fas fa-wallet"></i>
          </div>
          <p class="text-gray-500 text-sm mb-5">Elige un método para retirar tus ganancias y saldo a favor.</p>
          <div class="space-y-3">
            <button type="button" id="btn-add-bank" class="w-full flex items-center justify-center border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-800 font-bold py-3.5 rounded-xl transition-all">
              <i class="fas fa-building-columns mr-2 text-blue-600"></i> Cuenta Bancaria
            </button>
            <button type="button" id="btn-add-card" class="w-full flex items-center justify-center border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 text-gray-800 font-bold py-3.5 rounded-xl transition-all">
              <i class="fas fa-credit-card mr-2 text-orange-500"></i> Tarjeta Punto Pago
            </button>
          </div>
        </div>

        <!-- State: Bank account exists -->
        <div id="has-bank-state" class="hidden">
          <div class="flex items-center p-4 border border-blue-100 bg-blue-50/50 rounded-2xl" id="method-container-bg">
            <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 text-xl mr-4 shrink-0 border border-gray-100" id="method-icon-wrap">
              <i class="fas fa-piggy-bank" id="method-icon"></i>
            </div>
            <div class="min-w-0 flex-1">
              <div class="font-bold text-gray-900 truncate" id="bank-name-display">Banco General</div>
              <div class="text-sm text-gray-500 truncate mt-0.5"><span id="bank-type-display">Ahorros</span> •••• <span id="bank-number-display">1234</span></div>
            </div>
            <button id="btn-edit-bank" class="text-blue-600 hover:text-blue-800 p-2 font-bold text-sm">Cambiar</button>
          </div>
        </div>
      </div>`
);

fs.writeFileSync('/Users/juanpabloobregonjacome/Desktop/Checkout boton/agents/cashout.html', html);
