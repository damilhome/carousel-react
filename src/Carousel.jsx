import { FaQuoteRight } from 'react-icons/fa';
import { shortList, list, longList } from './data';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { useEffect, useState } from 'react';

const Carousel = () => {
    const [people, setPeople] = useState(list);
    const [currentPerson, setCurrentPerson] = useState(0);

    const prevSlide = () => {
        setCurrentPerson((prevPerson) => {
            return (prevPerson - 1 + people.length) % people.length;
        });
    };
    const nextSlide = () => {
        setCurrentPerson((prevPerson) => {
            return (prevPerson + 1) % people.length;
        });
    };

    useEffect(() => {
        let sliderId = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(sliderId);
    }, [currentPerson]);

    return (
        <>
            <section className="slider-container">
                {people.map(
                    ({ id, image, name, title, quote }, personIndex) => {
                        return (
                            <article
                                key={id}
                                className="slide"
                                style={{
                                    transform: `translateX(${
                                        100 * (personIndex - currentPerson)
                                    }%)`,
                                    opacity:
                                        personIndex === currentPerson ? 1 : 0,
                                    visibility:
                                        personIndex === currentPerson
                                            ? 'visible'
                                            : 'hidden',
                                }}
                            >
                                <img
                                    src={image}
                                    alt={name}
                                    className="person-img"
                                />
                                <h5 className="name">{name}</h5>
                                <p className="title">{title}</p>
                                <p className="text">{quote}</p>
                                <FaQuoteRight className="icon" />
                            </article>
                        );
                    }
                )}
                <button className="prev" onClick={prevSlide}>
                    <GrFormPrevious />
                </button>
                <button className="next" onClick={nextSlide}>
                    <GrFormNext />
                </button>
            </section>
        </>
    );
};
export default Carousel;
