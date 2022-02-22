import { Outlet } from "react-router-dom"
import Comp from './comp'
const LayoutComp = () => {
    return (
        <Comp>
            <Outlet />
        </Comp>
    )
}

export default LayoutComp