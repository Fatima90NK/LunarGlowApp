import React, {useState} from 'react';
//I want to show todays date
//1.write a code that shows current date 
// User can enter their location
//2. write a code where the user can fill in their location
// I want to show moon rise and moon set
//3.write a code that displays moon rise and moon set time
// I want to show a funfact about the moon
//4.create a database with funfacts and connect it with frontend, so it shows the funfact.
//funfacts needs to display 1 sentence per day. 
//Background should have galaxy themed: black with stars
//4.In css file add black background
// Picture of the moon in the middle
// 

const MoonPhaseDisplay = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <>
            <h1>Today's Moon Phase</h1>

            <p>{currentDate.toLocaleString()}</p>

        </>
    )
}

export default MoonPhaseDisplay;