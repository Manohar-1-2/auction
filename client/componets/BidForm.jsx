

const BidForm = ({handleBid,setBid,bid}) => {

  
  const handleInputChange = (event) => {
    
    setBid(event.target.value);
  };

  return (
    <form onSubmit={handleBid}>
      <div>
        <label htmlFor="bid">Bid:</label>
        <input
          type="text"
          id="bid"
          name="bid"
          value={bid}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Place Bid</button>
    </form>
  );
};

export default BidForm;