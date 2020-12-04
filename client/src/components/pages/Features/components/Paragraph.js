import React, {useState} from 'react';

// Import styles
import '../../../../App.scss';
import './Paragraph.css';

const Paragraph = (props) =>{
    
    // States
    const [isOpen,setIsOpen] = useState(false);

    // Functions
    const toggle = () =>{
        setIsOpen(!isOpen);
    }
    return(
        <div>
            <h4 className='title is-4 mb-2 active-title' onClick={toggle}><i class={props.icon}/>{props.title} <i class={isOpen ? "fas fa-angle-down ml-1":"fas fa-angle-up ml-1"}></i></h4>
            <div className={isOpen ? "paragraph-toggle is-active":"paragraph-toggle"}>
                <p>
                {props.content}
                </p>
            </div>
        </div>
    )
}

export default Paragraph;