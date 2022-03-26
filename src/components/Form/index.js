import './styles.css';

const Form = ({ formData, setFormData }) => {
  function handleChange(evt) {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  }

  return (
    <form>
      <div>
        <label htmlFor="name">Awarded to</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder={formData.name === '' && 'Name Surname'}
          value={formData.name}
          autoComplete="off"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="course">for completing</label>
        <input
          id="course"
          name="course"
          placeholder={
            formData.course === '' && 'Creating Dapps using IPFS & Blockchain'
          }
          value={formData.course}
          autoComplete="off"
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Form;
