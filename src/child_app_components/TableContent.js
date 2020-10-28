import React from "react"
import {Button} from "react-bootstrap"

function TableContent(props){
    return (

            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <Button variant="outline-info">Details</Button>
                <Button variant="outline-info">Update</Button>
                <Button variant="outline-info">Delete</Button>
            </tr>
        
    )
}

export default TableContent