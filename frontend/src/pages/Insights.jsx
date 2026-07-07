import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Images
import suryanamaskar from '../assets/suryanamaskar.png';
import warrior from '../assets/warrior_pose.png';
import lotus from '../assets/lotus_pose.png';
import cobra from '../assets/cobra_pose.png';
import meditation from '../assets/meditation.png';

import salmon from '../assets/food_salmon.png';
import avocado from '../assets/food_avocado.png';
import berries from '../assets/food_berries.png';
import almonds from '../assets/food_almonds.png';
import oats from '../assets/food_oats.png';

const CONDITIONS = [
  "General Wellness",
  "Diabetes",
  "Blood Pressure",
  "Thyroid",
  "PCOS"
];

// Data Generators with expanded detailed data
const generateExercises = (condition) => {
  const exercises = [];
  const basePoses = [
    { 
      title: 'Suryanamaskar (Sun Salutation)', 
      img: suryanamaskar,
      instructions: ['Stand tall with feet together.', 'Inhale, lift arms up.', 'Exhale, fold forward.', 'Step back into plank.', 'Lower down, then arch into cobra.', 'Push back into downward dog.', 'Step forward and rise.'],
      benefits: 'Improves circulation, builds core strength, and increases flexibility. Highly recommended for overall metabolic health.'
    },
    { 
      title: 'Virabhadrasana (Warrior Pose)', 
      img: warrior,
      instructions: ['Step one foot back 3-4 feet.', 'Turn back foot out 90 degrees.', 'Bend front knee to 90 degrees.', 'Extend arms out parallel to floor.', 'Gaze over front hand.'],
      benefits: 'Strengthens legs and ankles, stretches hips and groins, and improves focus and stamina.'
    },
    { 
      title: 'Padmasana (Lotus Pose)', 
      img: lotus,
      instructions: ['Sit on floor with legs extended.', 'Bend right knee and place foot on left thigh.', 'Bend left knee and place foot on right thigh.', 'Rest hands on knees with palms up.', 'Keep spine straight and breathe.'],
      benefits: 'Calms the brain, stimulates the pelvis and spine, and eases menstrual discomfort. Excellent for deep meditation.'
    },
    { 
      title: 'Bhujangasana (Cobra Pose)', 
      img: cobra,
      instructions: ['Lie on stomach with feet together.', 'Place hands under shoulders.', 'Inhale and lift chest off floor.', 'Keep elbows slightly bent.', 'Look straight ahead or slightly up.'],
      benefits: 'Strengthens the spine, stretches chest and lungs, and helps relieve stress and fatigue. Good for thyroid regulation.'
    },
    { 
      title: 'Deep Breathing Meditation', 
      img: meditation,
      instructions: ['Find a comfortable seated position.', 'Close your eyes gently.', 'Inhale slowly through nose for 4 seconds.', 'Hold for 4 seconds.', 'Exhale slowly through mouth for 6 seconds.', 'Repeat for 10 minutes.'],
      benefits: 'Dramatically lowers cortisol levels, reduces blood pressure, and improves mental clarity and emotional stability.'
    }
  ];
                    
  for (let i = 0; i < 50; i++) {
    const base = basePoses[i % basePoses.length];
    exercises.push({
      id: `ex-${i}`,
      title: `${base.title} - Set ${Math.floor(i/5) + 1}`,
      duration: `${10 + (i % 20)} mins`,
      img: base.img,
      instructions: base.instructions,
      benefits: base.benefits,
      type: 'exercise'
    });
  }
  return exercises;
};

const generateFoods = (condition) => {
  const foods = [];
  const baseMeals = [
    { 
      name: 'Baked Salmon with Quinoa', 
      img: salmon, 
      category: 'Protein',
      ingredients: ['1x 6oz Salmon Fillet', '1/2 cup Quinoa', '1 cup Broccoli florets', '1 tbsp Olive Oil', 'Lemon juice', 'Garlic powder, salt, pepper'],
      recommendedFor: ['General Wellness', 'Blood Pressure', 'PCOS', 'Thyroid']
    },
    { 
      name: 'Avocado Spinach Salad', 
      img: avocado, 
      category: 'Greens',
      ingredients: ['2 cups Fresh Spinach', '1/2 Ripe Avocado, sliced', '1/4 cup Cherry tomatoes', '1 tbsp Balsamic vinaigrette', 'Pumpkin seeds'],
      recommendedFor: ['Diabetes', 'General Wellness', 'Blood Pressure']
    },
    { 
      name: 'Berry Smoothie Bowl', 
      img: berries, 
      category: 'Fruit',
      ingredients: ['1 cup Mixed Berries (frozen)', '1/2 cup Greek Yogurt', '1/4 cup Almond milk', 'Chia seeds', 'Coconut flakes'],
      recommendedFor: ['PCOS', 'General Wellness', 'Thyroid']
    },
    { 
      name: 'Mixed Nuts & Almonds', 
      img: almonds, 
      category: 'Snack',
      ingredients: ['Raw Almonds', 'Walnuts', 'Pistachios', 'Zero added salt or sugar'],
      recommendedFor: ['Diabetes', 'PCOS', 'Blood Pressure', 'General Wellness']
    },
    { 
      name: 'Warm Oatmeal Bowl', 
      img: oats, 
      category: 'Breakfast',
      ingredients: ['1/2 cup Rolled Oats', '1 cup Water or Milk', 'Cinnamon', 'Sliced apples or bananas', '1 tsp Honey (optional)'],
      recommendedFor: ['Blood Pressure', 'General Wellness', 'Thyroid']
    }
  ];

  for (let i = 0; i < 500; i++) {
    const base = baseMeals[i % baseMeals.length];
    foods.push({
      id: `food-${i}`,
      name: `${base.name} - Variant ${Math.floor(i/5) + 1}`,
      category: base.category,
      img: base.img,
      ingredients: base.ingredients,
      recommendedFor: base.recommendedFor,
      type: 'diet'
    });
  }
  return foods;
};

// Sub-components
const Modal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '600px', margin: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, maxHeight: '90vh', overflowY: 'auto', padding: 0 }}>
        
        <div style={{ position: 'relative' }}>
          <img src={item.img} alt={item.name || item.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{item.name || item.title}</h2>
          
          {item.type === 'diet' && (
            <>
              <div style={{ display: 'inline-block', background: 'rgba(18, 91, 80, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '24px' }}>
                {item.category}
              </div>

              <h3 style={{ fontSize: '1.125rem', marginBottom: '12px' }}>Ingredients needed:</h3>
              <ul style={{ paddingLeft: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.ingredients.map((ing, idx) => (
                  <li key={idx} style={{ color: 'var(--text-light)' }}>{ing}</li>
                ))}
              </ul>

              <h3 style={{ fontSize: '1.125rem', marginBottom: '12px' }}>Highly Recommended For:</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {item.recommendedFor.map(cond => (
                  <span key={cond} style={{ background: '#F3F4F6', padding: '6px 12px', borderRadius: '8px', fontSize: '0.875rem' }}>{cond}</span>
                ))}
              </div>
            </>
          )}

          {item.type === 'exercise' && (
            <>
              <div style={{ display: 'inline-block', background: 'rgba(18, 91, 80, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '24px' }}>
                Duration: {item.duration}
              </div>

              <h3 style={{ fontSize: '1.125rem', marginBottom: '12px' }}>Step-by-step Instructions:</h3>
              <ol style={{ paddingLeft: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.instructions.map((step, idx) => (
                  <li key={idx} style={{ color: 'var(--text-light)' }}>{step}</li>
                ))}
              </ol>

              <div style={{ background: '#F0FDF4', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
                <h3 style={{ fontSize: '1rem', color: '#065F46', marginBottom: '8px' }}>Health Benefits</h3>
                <p style={{ color: '#064E3B', fontSize: '0.875rem', lineHeight: '1.5' }}>{item.benefits}</p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default function Insights() {
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [activeTab, setActiveTab] = useState('exercise'); // 'exercise' or 'diet'
  const [selectedItem, setSelectedItem] = useState(null); // the modal item
  
  // To avoid re-generating on every render, we memoize
  const exercises = React.useMemo(() => selectedCondition ? generateExercises(selectedCondition) : [], [selectedCondition]);
  const foods = React.useMemo(() => selectedCondition ? generateFoods(selectedCondition) : [], [selectedCondition]);

  if (!selectedCondition) {
    // Directory View
    return (
      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        <header className="app-header" style={{ padding: '24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ArrowLeft size={24} onClick={() => window.history.back()} style={{ cursor: 'pointer', color: 'var(--primary)' }} />
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Health Hub</h1>
            <p className="text-light text-sm">Select a condition for specialized insights.</p>
          </div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '80px' }}>
          {CONDITIONS.map(cond => (
            <div 
              key={cond} 
              className="card" 
              style={{ padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'transform 0.2s' }}
              onClick={() => setSelectedCondition(cond)}
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>{cond}</span>
              <div style={{ background: 'rgba(18, 91, 80, 0.1)', padding: '8px', borderRadius: '50%' }}>
                <ArrowLeft size={20} color="var(--primary)" style={{ transform: 'rotate(180deg)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Condition Detail View
  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      
      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />

      <header className="app-header" style={{ padding: '24px 0 12px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ArrowLeft size={24} onClick={() => setSelectedCondition(null)} style={{ cursor: 'pointer', color: 'var(--primary)' }} />
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>{selectedCondition} Hub</h1>
      </header>
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button 
          onClick={() => setActiveTab('exercise')}
          style={{ flex: 1, padding: '12px', background: activeTab === 'exercise' ? 'var(--primary)' : '#F3F4F6', color: activeTab === 'exercise' ? 'white' : 'var(--text)', transition: 'all 0.3s' }}
        >
          Exercises ({exercises.length})
        </button>
        <button 
          onClick={() => setActiveTab('diet')}
          style={{ flex: 1, padding: '12px', background: activeTab === 'diet' ? 'var(--primary)' : '#F3F4F6', color: activeTab === 'diet' ? 'white' : 'var(--text)', transition: 'all 0.3s' }}
        >
          Diet ({foods.length})
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
        {activeTab === 'exercise' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {exercises.map(ex => (
              <div 
                key={ex.id} 
                className="card" 
                style={{ padding: '8px', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => setSelectedItem(ex)}
              >
                <img src={ex.img} alt={ex.title} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} loading="lazy" />
                <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: '0 0 4px 0' }}>{ex.title}</h4>
                <p className="text-sm text-light" style={{ margin: 0 }}>{ex.duration}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'diet' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {foods.map(food => (
              <div 
                key={food.id} 
                className="card" 
                style={{ padding: '8px', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => setSelectedItem(food)}
              >
                <img src={food.img} alt={food.name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} loading="lazy" />
                <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: '0 0 4px 0' }}>{food.name}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: 'auto' }}>{food.category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
