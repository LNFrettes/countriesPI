import React from "react"
import '../StyleSheets/paginado.css'



export function Paginado ({amountPages, goToPage, current}) {
    
  
    

    return(
        <nav>
            <button className="bigPB" value={0}  onClick={(e) => goToPage(e)} >Primer Pagina</button>
            {current > 0 ? <button className="smallPB" value={current-1}  onClick={(e) => goToPage(e)} >{current-1}</button> : null}
            <button className="smallPB" value={current} onClick={(e) => goToPage(e)} >{current}</button>
            {current < amountPages - 1 ? <button className="smallPB" value={Number(current) + 1} onClick={(e) => goToPage(e)} >{Number(current) + 1} </button> : null}
            <button className="bigPB" value={amountPages-1} onClick={(e) => goToPage(e)} >Ultima pagina</button>
        </nav>
    )

}
