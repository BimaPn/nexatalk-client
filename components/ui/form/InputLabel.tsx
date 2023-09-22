export default function InputLabel({ forInput, value, className }:{forInput:string,value: string,className?:string}) {
    return (
        <label 
        htmlFor={forInput} 
        className={`absolute text-sm text-semiDark dark:text-d_semiLight duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-d_semiDark px-2 peer-focus:px-2 
        peer-focus:text-gray-700 dark:peer-focus:text-d_light peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
        peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1 ${className}`}>
            {value}
        </label>
    );
}
