import { Center, Float, OrbitControls, Text3D } from '@react-three/drei'

export default function Experience()
{
    return <>

        <OrbitControls makeDefault />

        {/* <Text3D>Hello</Text3D> */}
        <Float>
            <Center>
                <Text3D 
                font="./fonts/helvetiker_regular.typeface.json" 
                bevelEnabled
                bevelSize={0.04}
                bevelThickness={0.1}
                height={0.1}
                lineHeight={0.5}
                letterSpacing={-0.0001}
                size={0.3}>
                    {`Coming         Soon`}
                    <meshNormalMaterial />
                </Text3D>
            </Center>
        </Float>
    </>
}