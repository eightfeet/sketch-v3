import { ImageViewer, Image } from "antd-mobile"
import { useState } from "react"

const Img = ({
    src
}: { src: string }) => {
    const [visible, setVisible] = useState(false)
    return (
        <div style={{display: "flex", alignItems: "center", height: 260}}>
            <Image
                src={`./show/${src}`}
                fit="none"
                onClick={() => {
                    setVisible(true)
                }}
            />
            <ImageViewer
                image={`./show/big/${src}`}
                visible={visible}
                getContainer={() => document.body}
                onClose={() => {
                    setVisible(false)
                }}
            />
        </div>
    )
}

export default Img;