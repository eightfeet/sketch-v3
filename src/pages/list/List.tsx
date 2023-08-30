import React from 'react';
import { Image } from 'antd-mobile'
import 'wc-waterfall'
import useDocumentTitle from '~/hooks/useDocumentTitle';
import { CheckCircleFill } from 'antd-mobile-icons';
import s from './List.module.scss'
// import loading from '~/compontents/Loading';

interface Props {
    name?: string
}

const List: React.FC<Props> = ({ name = "list" }) => {
    useDocumentTitle(name)
    // loading.show()
    return (
        <div>
            <wc-waterfall gap={10} cols={3}>
                <div className={s.img}>
                    <Image lazy src="" />
                    <CheckCircleFill />
                </div>
            </wc-waterfall>
        </div>
    )
}





export default List;