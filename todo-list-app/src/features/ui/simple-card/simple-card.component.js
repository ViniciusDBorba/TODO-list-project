import '../../../styles/simple-card.css'


export const SimpleCard = ({title, children, testid}) => {
    return (
        <div className="Simple-card" data-testid={testid}>
            <p className="simple-title">{title}</p>
            {children}
        </div>
      );
};


