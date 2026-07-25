import { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import buildingData from '../../data/buildingData';
import { BUILDING_STOPS } from '../../data/pathData';
import './Modal.css';

function ModalContent({ data }) {
  const { content } = data;

  return (
    <>
      <div className="modal-xp-bar">
        <div className="modal-xp-fill" style={{ width: content.xpBarWidth }} />
      </div>

      {content.stats?.map((s, i) => (
        <div key={i} className="modal-stat">
          <span className="modal-stat-label">{s.label}</span>
          <span className="modal-stat-value" style={s.color ? { color: s.color } : {}}>
            {s.value}
          </span>
        </div>
      ))}

      {content.skills && (
        <div className="modal-skills">
          {content.skills.map((s, i) => (
            <span key={i} className="skill-tag">{s}</span>
          ))}
        </div>
      )}

      {content.abilitiesTitle && (
        <h4 className="modal-section-title">{content.abilitiesTitle}</h4>
      )}

      {content.abilities?.map((a, i) => (
        <div key={i} className="modal-achievement">
          <span className="modal-ach-icon">{a.icon}</span>
          <div>
            <div className="modal-ach-text">{a.text}</div>
            {a.stat && <div className="modal-ach-stat">{a.stat}</div>}
          </div>
        </div>
      ))}

      {content.sections?.map((sec, si) => (
        <div key={si}>
          <h4 className="modal-section-title">
            {sec.heading} <span className="modal-section-xp">{sec.xpLabel}</span>
          </h4>
          {sec.items.map((item, ii) => (
            <div key={ii} className="modal-achievement">
              <span className="modal-ach-icon">{item.icon}</span>
              <div><div className="modal-ach-text">{item.text}</div></div>
            </div>
          ))}
        </div>
      ))}

      {content.achievements?.map((a, i) => (
        <div key={i} className="modal-achievement">
          <span className="modal-ach-icon">{a.icon}</span>
          <div><div className="modal-ach-text">{a.text}</div></div>
        </div>
      ))}

      {content.traits?.map((t, i) => (
        <div key={i} className="modal-achievement">
          <span className="modal-ach-icon">{t.icon}</span>
          <div>
            <div className="modal-ach-text"><strong>{t.name}</strong> &mdash; {t.desc}</div>
            <div className="modal-ach-stat">{t.stat}</div>
          </div>
        </div>
      ))}
    </>
  );
}

export default function Modal() {
  const { activeModal, closeModal, visitBuilding, showToast, setPlayerPathIndex } = useGame();
  const data = activeModal ? buildingData[activeModal] : null;

  useEffect(() => {
    if (!activeModal || !data) return;

    // Snap player to building
    const stopIdx = BUILDING_STOPS[activeModal];
    if (stopIdx != null) setPlayerPathIndex(stopIdx);

    // Award XP
    const isNew = visitBuilding(activeModal, data.xp);
    if (isNew) {
      showToast(data.icon, data.title, `+${data.xp.toLocaleString()} XP earned!`);
    }
  }, [activeModal]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeModal]);

  if (!data) return null;

  return (
    <div className={`modal-overlay ${activeModal ? 'active' : ''}`} onClick={handleOverlayClick}>
      {data.photos && (
        <>
          <img className="modal-photo modal-photo-tl" src={data.photos[0]} alt="" />
          <img className="modal-photo modal-photo-bl" src={data.photos[1]} alt="" />
          <img className="modal-photo modal-photo-tr" src={data.photos[2]} alt="" />
          <img className="modal-photo modal-photo-br" src={data.photos[3]} alt="" />
        </>
      )}
      <div className="modal">
        <div className="modal-header">
          <div className="modal-icon" style={{ background: data.iconBg }}>
            {data.icon}
          </div>
          <div>
            <div className="modal-title">{data.title}</div>
            <div className="modal-subtitle">{data.subtitle}</div>
          </div>
          <button className="modal-close" onClick={() => closeModal()}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <ModalContent data={data} />
        </div>
      </div>
    </div>
  );
}
