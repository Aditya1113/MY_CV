import { useGame } from '../../context/GameContext';
import './Building.css';

function SchoolBuilding({ config }) {
  const w = config.width || 80;
  const h = config.height || 55;
  return (
    <div style={{ width: w, height: h + 18, position: 'relative' }}>
      <div
        className="b-roof"
        style={{
          borderBottom: `18px solid ${config.roofColor}`,
          left: -5, right: -5, top: 0, position: 'absolute',
        }}
      />
      <div className="b-base" style={{ width: w, height: h, marginTop: 18 }}>
        <div
          className="b-windows"
          style={{ gridTemplateColumns: `repeat(${config.windowCols}, 1fr)`, padding: '8px 6px' }}
        >
          {Array.from({ length: (config.windowRows || 2) * config.windowCols }).map((_, i) => (
            <div key={i} className="b-win" style={{ width: 11, height: 12 }} />
          ))}
        </div>
        <div className="b-door" />
      </div>
    </div>
  );
}

function TowerBuilding({ config }) {
  const w = config.width || 55;
  const h = config.height || 110;
  return (
    <div style={{ width: w, height: h, position: 'relative' }}>
      <div
        className="b-accent"
        style={{ top: 0, background: config.accentColor, height: 8, borderRadius: 3 }}
      />
      <div className="b-base" style={{ width: w, height: h - 10, marginTop: 10 }}>
        <div
          className="b-windows"
          style={{ gridTemplateColumns: `repeat(${config.windowCols}, 1fr)`, padding: '6px 4px', gap: 2 }}
        >
          {Array.from({ length: config.windowRows * config.windowCols }).map((_, i) => (
            <div key={i} className="b-win" style={{ width: 10, height: 10 }} />
          ))}
        </div>
        <div className="b-door" />
      </div>
    </div>
  );
}

function LabBuilding() {
  return (
    <div style={{ width: 90, height: 55, position: 'relative' }}>
      <div className="b-base" style={{ width: 90, height: 55 }}>
        <div className="b-accent" style={{ top: 8, background: 'var(--pink)' }} />
        <div className="b-accent" style={{ top: 18, background: 'var(--pink)' }} />
        <div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', fontSize: '1.4rem',
          }}
        >
          {'\u{1F4BB}'}
        </div>
      </div>
    </div>
  );
}

function StadiumBuilding() {
  return (
    <div style={{ width: 100, height: 55, position: 'relative' }}>
      <div className="stadium-flag" style={{ left: 16 }}>
        <div className="stadium-flag-cloth" style={{ background: 'var(--gold)' }} />
      </div>
      <div className="stadium-flag" style={{ right: 16 }}>
        <div className="stadium-flag-cloth" style={{ background: 'var(--pink)' }} />
      </div>
      <div
        className="b-base"
        style={{ width: 100, height: 45, borderRadius: '40% 40% 6px 6px', marginTop: 10 }}
      />
    </div>
  );
}

function CottageBuilding({ config }) {
  const s = config.scale || 1;
  return (
    <div style={{ width: 65 * s, height: 62 * s, position: 'relative' }}>
      <div className="cottage-chimney" />
      <div
        className="b-roof"
        style={{
          borderBottom: `${22 * s}px solid ${config.roofColor}`,
          left: -4 * s, right: -4 * s, top: -2, position: 'absolute',
        }}
      />
      <div
        className="b-base"
        style={{
          width: 60 * s, height: 38 * s,
          position: 'absolute', bottom: 0, left: 2 * s,
        }}
      >
        <div className="b-win" style={{ width: 10, height: 12, position: 'absolute', top: 8, left: 8 }} />
        <div className="b-win" style={{ width: 10, height: 12, position: 'absolute', top: 8, right: 8 }} />
        <div className="b-door" style={{ width: 10, height: 14 }} />
      </div>
    </div>
  );
}

const BUILDING_RENDERERS = {
  school: SchoolBuilding,
  tower: TowerBuilding,
  lab: LabBuilding,
  stadium: StadiumBuilding,
  cottage: CottageBuilding,
};

export default function Building({ config, isNear }) {
  const { setActiveModal } = useGame();
  const Renderer = BUILDING_RENDERERS[config.type];

  return (
    <div
      className={`building ${isNear ? 'near-glow' : ''}`}
      id={`bldg-${config.id}`}
      style={config.style}
      onClick={() => setActiveModal(config.id)}
    >
      <span className="level-badge" style={config.badgeStyle}>
        {config.badgeText}
      </span>
      <span className="xp-badge">{config.xpText}</span>
      {Renderer && <Renderer config={config} />}
      <div className="building-label">{config.label}</div>
    </div>
  );
}
