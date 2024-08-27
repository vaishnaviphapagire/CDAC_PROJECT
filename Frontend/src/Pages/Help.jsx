// Make sure to import your CSS file

export default function Help() {
  return (
    <div className="help-container">
      <div className="card help-card">
        <div className="card-body">
          <h2 className="help-card-title">Help Desk</h2>
          <p>If you need assistance, you can contact our authorities through the following methods:</p>
          <ul className="contact-info">
            <li><strong>Email:</strong> support@example.com</li>
            <li><strong>Phone:</strong> +1-234-567-890</li>
            <li><strong>Address:</strong> 123 Help Street, City, Country</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
