//In tất cả đơn vị tiền tệ
let currency = [ "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYN", "BYR", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMK", "ZMW", "ZWL"];
let currency1 = document.getElementById('currency1');
let currency2 = document.getElementById('currency2');
currency.map(val => {
	currency1.innerHTML += `<option value="${val}">${val}</option>`;
	currency2.innerHTML += `<option value="${val}">${val}</option>`;
})

let input = document.getElementById('input');
let converted = document.getElementById('converted');
let btn = document.getElementById('btn');
let numCovert, currSelected1, currSelected2;

//Lấy dữ liệu
function getData(currency1 = 'AED', currency2 = 'AED') {
	fetch(`https://free.currconv.com/api/v7/convert?q=${currency1}_${currency2}&compact=ultra&apiKey=e41422a078ac3f2d3bf7&fbclid=IwAR0vZp5jPPFOL24TrynAXDUbSpR1QfVXZQTP4Oq0PqQ4p8SNSiDvbHhqMpk`)
	.then(res => res.json())
	.then(res => numCovert = res)
	.then(() => numCovert = numCovert[`${currency1}_${currency2}`]);
}

//Format định dạng tiền
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

//Khi thay đổi đơn vị tiền tệ thì reload lại giá trị và lưu vào numCovert
currency1.onchange = function() {
	currSelected1 = currency1.options[currency1.selectedIndex].value;

	getData(currSelected1, currSelected2);
	input.value = '';
	converted.value = '';
};
currency2.onchange = function() {
	currSelected2 = currency2.options[currency2.selectedIndex].value;

	getData(currSelected1, currSelected2);
	input.value = '';
	converted.value = '';
};

//Khi nhập giá trị thì xuất giá trị quy đổi sang input coverted
input.addEventListener('input', function() {
	if (currSelected1 == currSelected2) converted.value = input.value;
	else converted.value = formatNumber(Number(input.value) * Number(numCovert));
})

//Khi nhấn nút
btn.addEventListener('click', function() {
	if (currSelected1 == currSelected2) converted.value = input.value;
	else converted.value = formatNumber(Number(input.value) * Number(numCovert));
})

