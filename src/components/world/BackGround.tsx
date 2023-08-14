

export default function BackGround(props: any){
    return(
        <mesh
            {...props}
        >
            <planeGeometry args={[500, 500]} />
            <meshStandardMaterial 
                color={0x66a6b3}
                fog={true}
            />
        
            
        </mesh>
    )
}