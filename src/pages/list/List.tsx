import React from 'react';
import useDocumentTitle from '~/hooks/useDocumentTitle';

interface Props {
    name?: string
}

const List:React.FC<Props> = ({name="list"}) => {
    useDocumentTitle(name)
    return (
        <div>
            
        </div>
    )
}

export default List;