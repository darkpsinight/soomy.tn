export const Converter = (date) => {
    switch (date?.getMonth()){
    case 0 :
        return "JAN";
        
    case 1 :
        return "FEV";
        
    case 2 :
        return "MAR";
        
    case 3 :
        return "AVR";
        
    case 4 :
        return "MAI";
        
    case 5 :
        return "JUI";
        
    case 6 :
        return "JUL";
        
    case 7 :
        return "AOU";
        
    case 8 :
        return "SEP";
        
    case 9 :
        return "OCT";
        
    case 10 :
        return "NOV";
        
    case 11 :
        return "DEC";
        
    default :
    return "NAN"
    }}
export const ConverterFull = (date) => {
    switch (date?.getMonth()){
    case 0 :
        return "Janvier";
        
    case 1 :
        return "Février";
        
    case 2 :
        return "Mars";
        
    case 3 :
        return "Avril";
        
    case 4 :
        return "Mai";
        
    case 5 :
        return "Juin";
        
    case 6 :
        return "Juillet";
        
    case 7 :
        return "Aout";
        
    case 8 :
        return "Septembre";
        
    case 9 :
        return "Octobre";
        
    case 10 :
        return "Novembre";
        
    case 11 :
        return "Décembre";
        
    default :
    return "NAN"
    }}