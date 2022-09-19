import '../../../styles/simple-card.css'


export const SimpleCard = ({title, children, testid, className}) => {
    return (
        <div className={`Simple-card ${className}`} data-testid={testid}>
            <p className="simple-title">{title}</p>
            {children}
        </div>
      );
};


