import React from 'react'
import TrainerCardLeft from './TrainerCardLeft'
import TrainerRight from './TrainerRight'

function Container() {
    return (
        <>
            <div className="main-container mt-2">
                <div className="card-collection pt-16 pb-10">
                    <TrainerCardLeft name="ARYA BARTAKKE" role="(MUAYTHAI/BOXING/ KICKBOXING TRAINER)" desc="Arya is a seasoned Muay Thai practitioner with over eight years of experience, honed through intensive training in Thailand, the sport's birthplace. His deep commitment to Muay Thai has developed him into a highly skilled and versatile fighter. As an active MMA competitor, Arya combines his striking expertise with the strategic versatility required for mixed martial arts, making him a formidable force in the ring. His relentless pursuit of excellence and competitive drive not only distinguish him as a fighter but also inspire those around him to push their limits." img="/images/Trainers/L1.png" />
                    <TrainerRight name="VAIBHAV MORE" role="(JIU-JITSU/WRESTLING/ BEGINNER TRAINER)" desc="Vaibhav possesses a robust background in Brazilian Jiu-Jitsu (BJJ), coupled with extensive experience in mixed martial arts (MMA). Over the years, he has competed in nine MMA matches, gaining valuable experience and honing his skills in both disciplines. His achievements in BJJ are particularly noteworthy, as he has earned the prestigious title of two-time bronze medalist at the national level. This accomplishment highlights not only his technical proficiency but also his unwavering dedication to the sport. Vaibhav's journey in martial arts reflects his commitment to continuous improvement and excellence, making him a formidable competitor and a respected practitioner in both BJJ and MMA." img="/images/Trainers/R1.png" />
                    <TrainerCardLeft name="LALIT ASWAR" role="(MMA AND BOXING PRACTITIONER FOR 8 YEARS)" desc="Arya is a seasoned Muay Thai practitioner with over eight years of experience, honed through intensive training in Thailand, the sport's birthplace. His deep commitment to Muay Thai has developed him into a highly skilled and versatile fighter. As an active MMA competitor, Arya combines his striking expertise with the strategic versatility required for mixed martial arts, making him a formidable force in the ring. His relentless pursuit of excellence and competitive drive not only distinguish him as a fighter but also inspire those around him to push their limits." img="/images/Trainers/L2.png" />
                    <TrainerRight name="SHUBHAM PANDEY" role="(THREE TIME NATIONAL MMA GOLD WINNER, MFN CONTENDERS)" desc="Shubham Pandey is a highly accomplished mixed martial artist, known for his exceptional achievements in the sport. As a three-time National MMA Gold Medalist, he has demonstrated dominance and expertise at the highest levels of competition. His prowess was further showcased when he secured the runner-up position in the prestigious MFN (Matrix Fight Night) Contenders, competing against the country's elite fighters. Shubham's versatility is evident in his Bronze Medal win at the ADCC 2020, one of the most respected submission grappling tournaments globally, highlighting his grappling skills. With over six years of experience as a wrestling practitioner, Shubham has built a strong foundation in this essential discipline, making him a formidable force in the MMA community." img="/images/Trainers/R2.png" />
                    <TrainerCardLeft name="JONATHAN ROBERTS" role="(PRO BJJ TRAINER)" desc="Jonathan Roberts is a highly seasoned Brazilian Jiu-Jitsu (BJJ) black belt with 15 years of dedicated practice, during which he has mastered the art and intricacies of BJJ. As a professional BJJ trainer, Jonathan offers unparalleled coaching, drawing from his deep well of experience and knowledge. He excels in teaching both fundamental and advanced grappling techniques, ensuring his students not only learn the moves but also understand the strategic concepts behind them. Jonathan’s ability to break down complex techniques and strategies makes him an exceptional instructor, guiding students of all levels toward achieving excellence in Brazilian Jiu-Jitsu." img="/images/Trainers/L3.png" />
                </div>
            </div>

        </>
    )
}

export default Container
