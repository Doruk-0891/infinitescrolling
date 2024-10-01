import {useCallback, useEffect, useRef, useState} from 'react';

const InfiniteScroll = (props) => {
    const {renderItem, dataList, getData, query} = props;
    const [loading, setLoading] = useState(null);
    const pageNumber = useRef(1);

    useEffect(() => {
        if (query === '') {
            return;
        }
        setLoading(true);
        getData(query, pageNumber.current).finally(() => setLoading(false));
    }, [query]);

    const renderList = useCallback(() => {
        return dataList.map((item ,index) => {
            return renderItem(item, index, null)
        })
    });
  return (
    <>
    {
        renderList()
    }
    </>
  )
}

export default InfiniteScroll