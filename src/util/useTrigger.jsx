import { useEffect, useState } from 'react';
import pb from '../../lib/pocketbase';

function useTrigger(id) {
  const [data, setData] = useState();

  pb.collection('triggers').subscribe('*', (e) => {
    if (e.action === 'update') {
      setData(e.record);
    }
  });

  useEffect(
    function () {
      setData({});
      if (id.length > 0) {
        async function search() {
          let data = await pb.collection('triggers').getOne(id);
          setData(data);
        }
        search();
      }
    },
    [id]
  );

  return data;
}

export default useTrigger;
