import {useCallback, useEffect, useRef, useState} from 'react';

const InfiniteScroll = (props) => {
    const {renderItem, dataList, getData, query} = props;
    const [loading, setLoading] = useState(null);
    const pageNumber = useRef(1);
    const observer = useRef(null);

    const lastElementObserver = useCallback((node) => {
        console.log(node);
        if (loading) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                pageNumber.current += 1;
                fetchData();
            }
        });

        if (node) {
            observer.current.observe(node);
        }
    });

    const fetchData = useCallback(() => {
        setLoading(true);
        getData(query, pageNumber.current).finally(() => setLoading(false));
    }, [query]);
    
    useEffect(() => {
        if (query === '') {
            return;
        }
        fetchData();
    }, [fetchData]);

    const renderList = useCallback(() => {
        return dataList.map((item ,index) => {
            if (index === dataList.length-1) {
                return renderItem(item, index, lastElementObserver)
            }
            return renderItem(item, index, null)
        })
    });
  return (
    <>
    {
        renderList()
    }
    {
        loading && 'Loading...'
    }
    </>
  )
}

export default InfiniteScroll