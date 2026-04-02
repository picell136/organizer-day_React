import React from 'react'
import { useState } from 'react';

const Show = ({ displayDay, displayMonth, displayYear }) => {
    const [value, setValue] = useState('');
    const [list, setList] = useState(() => {                  // массив для всех значений за один день
        let saved;
        Object.keys(localStorage).forEach(key => {
        saved = localStorage.getItem(`${key}`);
        });
        // Инициализация состояния из localStorage
        return saved ? JSON.parse(saved) : [];  // если в saved есть элементы, то он парсится в setList
    }); 

    function handleChange(event) {
        setValue(event.target.value);
    }

    function clickHandler(){
        let date = new Date();

        let noteDate = `${displayDay}-${displayMonth}-${displayYear}`

        // Это список заметок за весь день
        const updatedList = [  ...list, 
                                { value: value, 
                                  creationTime: date.getTime(), 
                                  date: noteDate, 
                                  completed: false, 
                                  isEdit: false,
                                  valueInInput: ''
                                 }
                            ]
        setList(updatedList)
        localStorage.setItem(`key`, JSON.stringify(updatedList));

        setValue('')
    }

    // Функция переключения completed
    const toggleCompleted = (creationTime) => {
        // Создаем новый массив, обновляя только нужный элемент
        const updatedList = list.map(note => {
            if (note.creationTime === creationTime) {
                return { ...note, completed: !note.completed }; // Инвертируем состояние
            }   
            return note;
        });
        // Обновляем состояние и передаем в localStorage
        setList(updatedList);
        localStorage.setItem(`key`, JSON.stringify(updatedList));
    }

    // Функция переключения isEdit
    const toggleIsEdit = (creationTime) => {

        let input = document.getElementById(creationTime)

        // Создаем новый массив, обновляя только нужный элемент
        const updatedList = list.map(note => {
            if (note.creationTime === creationTime) {

                input.value = note.value // в инпут попадает значение текста

                return { ...note, isEdit: !note.isEdit, valueInInput: note.value };  
            }   
            return note;
        });
        //Обновляем состояние и передаем в localStorage
        setList(updatedList);
        localStorage.setItem(`key`, JSON.stringify(updatedList));
    }

    // Функция для обновления значения заметки при редактировании
    const handleEditChange = (creationTime, newValue) => {
        const updatedList = list.map(note => {
            if (note.creationTime === creationTime) {
                return { ...note, value: newValue };
            }
            return note;
        });
        setList(updatedList);
        localStorage.setItem('key', JSON.stringify(updatedList));
    };

    // Функция удаления заметки
    const deleteNote = (creationTime) => {
        const updatedList = list.filter(note => note.creationTime !== creationTime);    // Метод filter перебирает массив list и применяет функцию к каждому элементу. 
        setList(updatedList);                                                           // Он возвращает только заметки, идентификаторы которых не совпадают с указанным идентификатором creationTime, фактически удалив выбранную заметку. 
        localStorage.setItem('key', JSON.stringify(updatedList));
    };

    // Фильтруем по дате
    let filtered = list.filter(note => note.date === `${displayDay}-${displayMonth}-${displayYear}`);


    let res = () => filtered.length === 0 ? 
                        '' : 
                        filtered.map((elem, i) => { 
                            return  <li key={i}>
                                                <div className='note'>

                                                    <span    
                                                        className='task'
                                                        style={{
                                                            textDecoration: elem.completed ? 'line-through' : 'none',
                                                            visibility: !elem.isEdit ? 'visible' : 'hidden'
                                                            }}
                                                    > 
                                                        {elem.value} 
                                                    </span>
                                                    <input
                                                        id={elem.creationTime}  // Генерируем для каждого инпута свой id
                                                        className='inputValue'
                                                        style={{
                                                            visibility: elem.isEdit ? 'visible' : 'hidden'
                                                        }}
                                                        onChange={(e) => handleEditChange(elem.creationTime, e.target.value)} // Функция срабатывающая каждый раз при новом значении
                                                    />

                                                    <div className={elem.isEdit ? 'buttons-isEdit' : 'buttons-notEdit'}>
                                                        <span className='done' >
                                                            <button type='submit' onClick={() => toggleCompleted(elem.creationTime)}>
                                                                <div className='done-button'>✓</div>
                                                            </button>
                                                        </span>
                                                        <span>
                                                            <button 
                                                                type='submit' 
                                                                onClick={() => toggleIsEdit(elem.creationTime)} 
                                                            >
                                                                    {elem.isEdit ? 'Сохранить' : 'Редактировать'}
                                                            </button>
                                                        </span>
                                                        <span>
                                                            <button
                                                                className='delete-button' 
                                                                type='submit' 
                                                                onClick={() => deleteNote(elem.creationTime)}
                                                            >
                                                                Удалить
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                            })
                          
    return <>
            <div className='content'>
                <div>
                    <input name='text' value={value} onChange={handleChange} />
                    <button type='submit' onClick={clickHandler}>Добавить заметку</button></div>
                <div>
                    <ul>
                        {res()}
                    </ul>
                </div>
            </div>
        </>
}

export default Show