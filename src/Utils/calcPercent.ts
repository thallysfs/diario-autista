export function calcPercent(valorMarcado: number, valortotal: number){
 let percentage = (valorMarcado / valortotal) * 100;
 return percentage.toFixed(2)
}
