from datetime import datetime, timedelta, time

def calculate_reminder_times(condition: str, food_relation: str, frequency: str, user_routines: dict):
    # user_routines: {"wake_up_time": time, "breakfast_time": time, "lunch_time": time, "dinner_time": time}
    reminders = []
    
    # Default offsets
    BEFORE_FOOD_OFFSET = timedelta(minutes=30)
    AFTER_FOOD_OFFSET = timedelta(minutes=30)
    EMPTY_STOMACH_OFFSET = timedelta(minutes=60) # typically before breakfast
    
    def apply_offset(t: time, offset: timedelta, subtract=True):
        if not t:
            return None
        dt = datetime.combine(datetime.today(), t)
        if subtract:
            new_dt = dt - offset
        else:
            new_dt = dt + offset
        return new_dt.time()

    meals = [
        user_routines.get("breakfast_time"),
        user_routines.get("lunch_time"),
        user_routines.get("dinner_time")
    ]
    
    # Simple logic to create reminders based on food relation and frequency
    # We will expand this logic to be condition-specific if needed
    
    # For now, let's map frequency to how many meals
    meal_times_to_use = []
    if frequency == "1/day":
        meal_times_to_use = [user_routines.get("breakfast_time")]
    elif frequency == "2/day":
        meal_times_to_use = [user_routines.get("breakfast_time"), user_routines.get("dinner_time")]
    elif frequency == "3/day":
        meal_times_to_use = meals
        
    for meal in meal_times_to_use:
        if not meal:
            continue
        
        # Apply condition specific offsets if needed, else default
        if condition == "Diabetes":
            BEFORE_FOOD_OFFSET = timedelta(minutes=15) # Example tweak
            
        if food_relation == "Before Food":
            reminders.append(apply_offset(meal, BEFORE_FOOD_OFFSET, subtract=True))
        elif food_relation == "After Food":
            reminders.append(apply_offset(meal, AFTER_FOOD_OFFSET, subtract=False))
        elif food_relation == "Empty Stomach":
            # Just use wake up time or far before breakfast
            wake_up = user_routines.get("wake_up_time")
            if wake_up:
                reminders.append(apply_offset(wake_up, timedelta(minutes=0), subtract=False))
            else:
                reminders.append(apply_offset(meal, EMPTY_STOMACH_OFFSET, subtract=True))

    return reminders
