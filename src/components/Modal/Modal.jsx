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
          {data.photos.map((photo, index) => {
            // This preserves your exact placement order: TL, BL, TR, BR
            const positions = [
              'modal-photo-tl', 
              'modal-photo-tr', 
              'modal-photo-bl',
              'modal-photo-br',
            ];

            return (
              <img 
                key={index}
                className={`modal-photo ${positions[index]}`} 
                src={photo} 
                alt="" 
              />
            );
          })}
        </>
      )}
{data.videos && (
        <>
          {data.videos.map((vid, index) => {
            // Assign a different corner to each video based on its index
            const positionClasses = [
              'modal-photo-tl', // 1st video goes Top Left
              'modal-photo-tr', // 2nd video goes Top Right
              'modal-photo-bl', // 3rd video goes Bottom Left
              'modal-photo-br'  // 4th video goes Bottom Right
            ];
            
            return (
              <video 
                key={index} 
                className={`modal-photo ${positionClasses[index]}`}
                src={vid} 
                autoPlay 
                loop 
                muted 
                playsInline 
              />
            );
          })}
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
