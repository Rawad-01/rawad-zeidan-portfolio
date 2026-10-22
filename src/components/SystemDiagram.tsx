export function SystemDiagram() {
  return (
    <figure className="system-diagram">
      <div className="diagram-top">
        <span>Checkout / Architecture</span>
        <span aria-hidden="true">↗</span>
      </div>
      <div className="diagram-body">
        <div className="diagram-input">
          <span className="tiny-label">01 / INPUT</span>
          <strong>
            One cart.
            <br />
            Connected records.
          </strong>
        </div>
        <div className="flow-line" aria-hidden="true">
          <span />
        </div>
        <div className="transaction">
          <span className="tiny-label">DATABASE TRANSACTION</span>
          <div className="transaction-items">
            <span>
              Sale<small>Payment & totals</small>
            </span>
            <span>
              Sale items<small>Prices & quantities</small>
            </span>
            <span>
              Stock movements<small>Inventory trail</small>
            </span>
          </div>
          <span className="transaction-end">
            <i />
            Commit together. Roll back together.
          </span>
        </div>
      </div>
      <figcaption>
        Implementation diagram · Based on the checkout source
      </figcaption>
    </figure>
  );
}
