import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

interface Props {
    name?: string
}

const Home:React.FC<Props> = ({ name="home" }) => {
    useDocumentTitle(name)
    return (
        <div>
            home
        </div>
    )
}

export default Home;