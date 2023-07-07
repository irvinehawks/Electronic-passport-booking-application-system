import React from 'react'

function Resources() {
  return (
    <div>
      <h3>
        You can download the resources below for use during online passport
        application.
      </h3>
      <div>
        <a href="irvene_kwambana_cv1.pdf" download>
          <button className="about btn pointer">
            fingerprint Forms
          </button>
        </a>

        <p></p>
        <a href="irvene_kwambana_cv1.pdf" download>
          <button className="about btn pointer">Affidavit Forms</button>
        </a>

        <p></p>
        <a href="irvene_kwambana_cv1.pdf" download>
          <button className="about btn pointer">E-passport application guidelines handbook</button>
        </a>
      </div>
      <p></p>
    </div>
  );
}

export default Resources