const CustomRegex = (()=>({
     onlyPositiveInteger : /^(\+)?([\d]+|Infinity)$/,
     onlyPositiveIntegerStringArray : /^(\+)?[\d\,]+$/
}))();

export default CustomRegex;