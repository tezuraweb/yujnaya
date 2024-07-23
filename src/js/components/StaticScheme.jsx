import React, { useState, useEffect, useRef, Suspense } from 'react';
import LoadingSpinner from '../includes/LoadingSpinner';
import Territory from '../includes/maps/Territory';
import FloorMap from '../includes/maps/FloorMap';

const Scheme = ({ activeElement = null }) => {
    const [floors, setFloors] = useState([]);
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;

        if (svg) {
            const element = svg.querySelector(`[data-id="${activeElement.key_liter_id}"]`);
            if (element) {
                element.classList.add('active');
            }
        }
    }, []);

    useEffect(() => {
        const loadFloor = async () => {
            const floors = await loadFloors(activeElement.key_liter_id, activeElement.floor);
            console.log('lol', activeElement.key_liter_id, activeElement.floor)
            setFloors(floors);
        };

        if (activeElement) {
            loadFloor();
        }
    }, [activeElement]);

    const loadFloors = async (buildingId, floor) => {
        switch (buildingId) {
            case 1:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/A_pr2/Floor1'))];
                break;
            case 14:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/B/Floor1'))];
                break;
            case 10:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/V/Floor1'))];
                if (floor === 1) return [React.lazy(() => import('../includes/maps/V/Floor2'))];
                break;
            case 8:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/E/Floor1'))];
                break;
            case 7:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/P/Floor1'))];
                break;
            case 16:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/G/Floor1'))];
                break;
            case 9:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/Zh/Floor1'))];
                if (floor === 1) return [React.lazy(() => import('../includes/maps/Zh/Floor2'))];
                break;
            case 3:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/Z/Floor1'))];
                break;
            case 15:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/I/Floor1'))];
                break;
            case 23:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/S/Floor1'))];
                break;
            case 5:
                if (floor === 0) return [React.lazy(() => import('../includes/maps/D/Floor1'))];
            default:
                return [];
        }
    };

    return (
        <div className="scheme">
            <div className="scheme__row">
                <div className="scheme__column">
                    <Suspense fallback={<LoadingSpinner />}>
                        <FloorMap
                            floors={floors}
                            selectedRoomData={{
                                id: activeElement.id,
                                code: activeElement.kode_text,
                                complex: activeElement.complex_id,
                            }}
                        />
                    </Suspense>
                </div>
                <div className="scheme__column">
                    <Territory ref={svgRef} />
                </div>
            </div>
        </div>
    );
};

export default Scheme;
