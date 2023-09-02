import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Space } from 'antd-mobile';

interface Props {
    name?: string
}

const Home: React.FC<Props> = ({ name = "home" }) => {
    useDocumentTitle(name)
    return (
        <div>
            <Space>
                <Link to="/" >首页</Link>
                <Link to="/list" >列表</Link>
                <Link to="/view" >详情</Link>
            </Space>
        </div>
    )
}

export default Home;