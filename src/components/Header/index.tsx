import Image from "next/image"



export default function Header() {

    return(
        <div className={`flex lg:flex-row lg:gap-8 lg:justify-center items-center sm:gap-0 sm:justify-center`}>
            <Image src={"/images/logo.svg"} alt="logo" width={80} height={110} />
            <h1 className={`lg:text-xl sm:text-sm`}>WeatherVial</h1>
        </div>
    )
}