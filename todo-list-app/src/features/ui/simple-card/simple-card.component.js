import '../../../styles/simple-card.css'


export const SimpleCard = ({title, children}) => {
    return (
        <div className="Simple-card">
            <p className="simple-title">{title}</p>
            {children}
        </div>
      );
};


