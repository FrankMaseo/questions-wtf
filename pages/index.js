import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import Header from '../components/Header';
import Title from '../components/Title';
import QuestionCard from '../components/QuestionCard';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <div style={{ height: "100vh" }} className="question-container">
            <Header />
            <Title />
            <QuestionCard />
        </div>
    )
}
