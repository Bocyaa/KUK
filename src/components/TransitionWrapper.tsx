import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/page-transitions.css';

interface TransitionWrapperProps {
  children: ReactNode;
}

export default function TransitionWrapper({
  children,
}: TransitionWrapperProps) {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={300}
        unmountOnExit
      >
        <div className="page-wrapper">{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
}
