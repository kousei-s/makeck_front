import { useState, useEffect } from "react"

const useFormatChart = (menuData) => {
    const [formatData, setFormatData] = useState(null)
    const [formatError, setFormatError] = useState(null)

    useEffect(() => {
        
    }, [menuData]);

    return {formatData, formatError}
}

export default useFormatChart