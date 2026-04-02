import React from 'react'
import { useState } from 'react';

import Show from './Show'

const HomePage = () => {
    let date  = new Date();
    let year  = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    const [displayDay, setDisplayDay] = useState(day);
    const [displayMonth, setDisplayMonth] = useState(month);
    const [displayYear, setDisplayYear] = useState(year);


    function prevDay() {
        if (displayDay === 1) {
            if (displayMonth === 0) {
                setDisplayYear(displayYear - 1)
                setDisplayMonth(11)
                setDisplayDay(getLastDayofMonth()) 
            } else {
                setDisplayMonth(displayMonth - 1)
                setDisplayDay(getLastDayofMonth())                
            }               
        } else {
           setDisplayDay(displayDay - 1) 
        }
    }

    function nextDay() {
        let date = new Date(displayYear, displayMonth, displayDay); // выясняем дату показанную на экране
        let lastDay = new Date(displayYear, displayMonth + 1, -1);  // посл. день след. месяца даты, показанной на экране

        if (date.getDate() == lastDay.getDate() + 1) { // если дата на экране равна последнему дню месяца, то идёт переход на 1е число след. месяца
            setDisplayDay(1)
            setDisplayMonth(displayMonth + 1)
            if (displayMonth === 11){
                setDisplayMonth(0)
                setDisplayYear(displayYear + 1)
            }
        } else {
            setDisplayDay(displayDay + 1)  
        }
    }


    // последний день месяца
    function getLastDayofMonth(){
        let date = new Date(displayYear, displayMonth, 0);
        return date.getDate()
    }

    function convertMonths(displayMonth){
        let months = [  'января', 'февраля', 'марта', 'апреля', 
                        'мая', 'июня', 'июля', 'августа', 
                        'сентября', 'октября', 'ноября', 'декабря']
        return months[displayMonth]
    }

    return <>
            <div className='main-container'>
                <div className='container'>
                    <h1>Заметки</h1>
                    <div className='navigation'>
                        <span className={["icon-arrow"]} onClick={prevDay}>
                            <img src="../../public/arrow-circle-left.svg" alt="Arrow circle icon" width="50" height="50"/>
                        </span>
                        <div className='date'> {displayDay} {convertMonths(displayMonth)} {displayYear} года </div>
                        {/* <button onClick={nextDay}>→</button> */}
                        <span className={["icon-arrow"]} onClick={nextDay}>
                            <img src="../../public/arrow-circle-right.svg" alt="Arrow circle icon" width="50" height="50"/>
                        </span>
                    </div>
                    <Show displayDay={displayDay} displayMonth={displayMonth} displayYear={displayYear}/>
                </div>
            </div>
        </>
}

export default HomePage