import {useState, useCallback, useRef} from 'react';
import InfiniteScroll from './InfiniteScroll';

function App() {
  const [query, setQuery] = useState('');
  const [dataList, setDataList] = useState([]);
  const controller = useRef(null);

  const handleQuery = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const renderItem = useCallback(({title}, key, ref) => {
    return <div ref={ref} key={key}>{title}</div>
  }, []);

  const getData = useCallback((query, pageNumber) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (controller.current) {
          controller.current.abort();
        }

        controller.current = new AbortController();

        const url = 'https://openlibrary.org/search.json?'+ new URLSearchParams({
          q: query,
          page: pageNumber
        });

        const promiseData = await fetch(url, {signal: controller.current.signal});

        const jsonData = await promiseData.json();
        
        resolve();
        setDataList((prevData) => [...prevData, ...jsonData.docs]);
      } catch (error) {
      }
    });
  }, []);

  return (
    <div>
      <input type='text' placeholder='Type to search' value={query} onChange={(e) => handleQuery(e)} />
      <InfiniteScroll 
      getData={getData} 
      query={query}
      renderItem={renderItem}
      dataList={dataList}
      />
    </div>
  );
}

export default App;
