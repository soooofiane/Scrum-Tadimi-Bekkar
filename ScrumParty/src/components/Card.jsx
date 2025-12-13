function Card({ value, onClick }) {
    const getCardDisplay = (val) => {
        if (val === 'coffee') return '☕';
        if (val === '?') return '?';
        return val;
    };

    const getCardColor = (val) => {
        if (val === 'coffee') return 'bg-amber-100 border-amber-400 hover:bg-amber-200';
        if (val === '?') return 'bg-purple-100 border-purple-400 hover:bg-purple-200';
        return 'bg-white border-gray-300 hover:bg-gray-50';
    };

    return (
        <button
        onClick={onClick}
        className={`
            ${getCardColor(value)}
            border-2 rounded-xl p-6 
            flex items-center justify-center
            text-4xl font-bold
            transition duration-200 transform hover:scale-110 hover:shadow-xl
            focus:outline-none focus:ring-4 focus:ring-indigo-300
            text-gray-800
        `}
        aria-label={`Vote for ${value}`}
        >
        {getCardDisplay(value)}
        </button>
    );
}
  
export default Card;
  
  