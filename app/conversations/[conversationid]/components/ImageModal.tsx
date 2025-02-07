"use Client"

import Modal from "@/app/components/Model"
import Image from "next/Image"
type ImageModalProps={
    src?:string|null
    isOpen?:boolean
    onClose:()=>void
}

export const ImageModal:React.FC<ImageModalProps> =(
    {
        isOpen,
        src,
        onClose
    }
)=>{
    if(!src){
        return null;
    }

    return <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-80 h-80">
            <Image 
            src={src} 
            fill
            className="object-cover"
            alt="Image"
            />

        </div>
    </Modal>
}