import { useLocation } from 'react-router-dom';
import { pageComponentMap } from './pageMap.jsx';

const PageRender = () => {
  const location = useLocation();
  const Component = pageComponentMap[location.pathname];

  return Component ? <Component /> : <div>404 - 페이지 없음</div>;
};

export default PageRender;
