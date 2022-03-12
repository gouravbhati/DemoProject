import { APP_CONST } from "./AppConst";

export function formate_price(num2) {
    {
        const num = parseFloat(num2).toFixed(2);
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (parseInt(num_parts[1]) > 0) {
            return `R ${num_parts.join('.')}`;
        }
        return `${APP_CONST.currency}${num_parts[0]}`;
    }
}


export function formate_price_without_currency(num2) {
    {
        const num = parseFloat(num2).toFixed(2);
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (parseInt(num_parts[1]) > 0) {
            return `${num_parts.join('.')}`;
        }
        return `${num_parts[0]}`;
    }
}
