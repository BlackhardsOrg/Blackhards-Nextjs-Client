export default function CategoryElement1({ data }: any) {
  return (
    <>
      <div className="checkbox-style1">
        <label className="custom_checkbox">
          {data.name}
          <input type="checkbox" />
          <span className="checkmark" />
          <span className="right-tags">({data.total})</span>
        </label>
      </div>
    </>
  );
}
