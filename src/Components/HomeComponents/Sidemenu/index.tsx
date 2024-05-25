export default function Sidemenu() {
  const categorys = [
    '음악',
    '영화/드라마',
    '강의/책',
    '호텔',
    '가구/인테리어',
    '식당',
    '전자기기',
    '화장품',
    '의류/악세서리',
    '앱',
  ];

  return (
    <div>
      <p>카테고리</p>
      {categorys.map((category, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ul key={index}>{category}</ul>
      ))}
    </div>
  );
}
