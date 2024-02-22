import {React, useState } from 'react';
import courseData from '../../courses.json';

const Navbar = () => {
    const [titleColor, setTitleColor] = useState('black');

    const handleTitleClick = () => {
        setTitleColor(titleColor === 'black' ? 'blue' : 'black');
    };

    return (
        <nav>
            <div onClick={handleTitleClick} style={{ color: titleColor }}>
                Unilectives
            </div>
        </nav>
    );
};

const SearchBar = ({ onSearchClick }) => {
    return (
        <div>
            <input type="text" placeholder="Search for a course e.g. COMP1511" />
            <select>
                <option value="relevance">Sort by</option>
            </select>
            <button onClick={onSearchClick}>Search</button>
        </div>
    );
};


const CourseCard = ({ course }) => {
    const renderStars = (averageStars) => {
        const fullStars = Math.floor(averageStars);
        const hasHalfStar = averageStars % 1 !== 0;
        const emptyStars = Math.floor(5 - averageStars);

        return (
            <>
                {'★'.repeat(fullStars)}
                {hasHalfStar && '½'}
                {'☆'.repeat(emptyStars)}
            </>
        );
    };

    return (
        <div className="course-card">
            <h3>{course.course_title}</h3>
            <div className="course-rating">{renderStars(course.average_stars)}</div>
            <div>
                {course.terms.map((term, index) => (
                    <span key={index}>{term}</span> 
                ))}
            </div>
        </div>
    );
};


const CourseGrid = ({ courses }) => {
    return (
        <div className="course-grid">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

const App = () => {
    const [searchClicked, setSearchClicked] = useState(false);
    const [courses] = useState(courseData);

    const handleSearchClick = () => {
        setSearchClicked(true);
    };

    const handleCloseClick = () => {
        setSearchClicked(false);
    };

    return (
        <div>
            <Navbar />
            <SearchBar onSearchClick={handleSearchClick} />
            <CourseGrid courses={courses} />
            {searchClicked && (
                <div className="overlay">
                    <div className="centered-box">
                        <button onClick={handleCloseClick}>Close</button>
                    </div>
                </div>
            )}
            {/* <Footer /> */}
        </div>
    );
};

export default App;
