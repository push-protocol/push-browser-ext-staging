import React, {useEffect} from "react";
import './Transition.css'
import gsap from "gsap";

const Transitions = () => {
    const tl = gsap.timeline()

    useEffect(() => {
        tl.to(".transition-effect", {
            duration: 5,
            x: 2600,
            ease: "power4.easeOut"
        })
    },[])


    return ( 
        <div>
            <div className="transition-effect"></div>
        </div>
     );
}
 
export default Transitions;